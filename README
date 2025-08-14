# Upload Artifact to Artim-CDN

A GitHub Action to upload a file to the **Artim-Industries CDN** directly from your workflow.

## 📦 Features
- Upload any file to the CDN during your CI/CD pipeline
- Automatically names the build directory using the current timestamp
- Outputs the uploaded file's public URL
- Supports **Basic Auth** for secure uploads

---

## 🚀 Usage

### Example Workflow
```yaml
name: Upload to Artim-CDN

on:
  push:
    branches:
      - main

jobs:
  upload:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Build project
        run: |
          echo "Hello World" > example.txt

      - name: Upload to Artim-CDN
        uses: Artim-Industries/upload-artifact-cdn@v1
        with:
          path: example.txt
          username: ${{ secrets.CDN_USERNAME }}
          password: ${{ secrets.CDN_PASSWORD }}
```