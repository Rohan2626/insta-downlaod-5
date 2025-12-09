# InstaSaver Pro

A robust Instagram Video Downloader with a React frontend and Node.js/Python backend.

## Deployment

### Frontend (Netlify)
Live URL: [https://instasaver-rw-v1.netlify.app](https://instasaver-rw-v1.netlify.app)

### Backend (Render)
Click the button below to deploy the backend to Render. It will automatically configure the Docker environment using `render.yaml`.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/2607mray-cmd/instasaver-pro-rw)

**Note**: You will need to provide `JWT_SECRET` in the dashboard if it's not auto-generateds.

## Local Development

1. **Backend**:
   ```bash
   cd backend
   npm install
   npx prisma generate
   npm run dev
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
