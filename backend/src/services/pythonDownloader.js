// src/services/pythonDownloader.js
const { spawn } = require('child_process');
const path = require('path');

const SCRIPT_PATH = path.join(__dirname, '../scripts/downloader.py');

/**
 * Execute python script to fetch video info
 * @param {string} url Instagram URL
 * @returns {Promise<Object>}
 */
function fetchVideoInfoPython(url) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', [SCRIPT_PATH, url]);

        let stdoutData = '';
        let stderrData = '';

        pythonProcess.stdout.on('data', (data) => {
            stdoutData += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            stderrData += data.toString();
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                console.error(`Python script exited with code ${code}`);
                console.error(`Stderr: ${stderrData}`);
                return reject(new Error('Failed to execute downloader script'));
            }

            try {
                // Parse the last line or the whole output if it's just JSON
                // Depending on if there are warnings printed to stdout
                // The script attempts to be quiet, but let's be safe and trim
                const result = JSON.parse(stdoutData.trim());
                if (result.success) {
                    resolve(result);
                } else {
                    reject(new Error(result.error || 'Unknown error from specific script logic'));
                }
            } catch (err) {
                console.error('Failed to parse Python output:', stdoutData);
                reject(new Error('Invalid response from downloader script'));
            }
        });
    });
}

module.exports = { fetchVideoInfoPython };
