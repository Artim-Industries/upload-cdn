const core = require('@actions/core');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
import fetch from 'node-fetch';  
import { createReadStream } from 'fs';
import FormData from 'form-data';

// Base64 encode for Basic Auth
function btoa(str) {
  return Buffer.from(str, "utf-8").toString("base64");
}

async function run() {
  try {
    const filePath = core.getInput('path', { required: true });
    const username = core.getInput('username', { required: true });
    const password = core.getInput('password', { required: true });

    if (!fs.existsSync(filePath)) {
      core.setFailed(`File not found: ${filePath}`);
      return;
    }

    const fileNameWithExt = path.basename(filePath);
    const [fileName, fileExtension] = fileNameWithExt.split(/\.(.+)$/); // split on first dot

    const dateFormattedAsText = new Date().toISOString();

    const uploadUrl = `https://artim-cdn.artim-industries.com/upload/ci/$/${username}/build-${dateFormattedAsText}/${fileName}.${fileExtension}`;
    const fileStream = createReadStream(filePath);

    console.log(`Uploading to: ${uploadUrl}`);

    const formData = new FormData();
    formData.append("file", fileStream);
    const response = await fetch(uploadUrl, {
        method: "POST",
        headers: {
            Authorization: "Basic " + btoa(username + ":" + password),
            Accept: "application/json",
        },
        body: formData,
    });

    if (response.status === 200 || response.status === 201) {
      const data = await response.json();
      const url = data.url;
      console.log(`✅ Uploaded successfully: ${url}`);
      core.setOutput('url', url);
      core.setOutput('status', 'success');
    } else {
      core.setFailed(`Upload failed: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    core.setFailed(`Upload failed: ${error.message}`);
  }
}

run();