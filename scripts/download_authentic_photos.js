const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const items = [
    {
        url: "https://images.squarespace-cdn.com/content/v1/52fecd05e4b0fd11a2d37dd4/1448187522080-8KBFQT697R1KXR1VXTKS/Suai+Loro+Tattoo%2C+Timor.+%28The+4th+Wall%2C+stories+of+tattoos+%26+body+modification%2C+by+Fareed+Kaviani%29",
        dest: "/Volumes/Genius Art/Antigravity/Bali Tours/images/timor/the4thwall_suai_loro_elder.jpg"
    },
    {
        url: "https://images.squarespace-cdn.com/content/v1/52fecd05e4b0fd11a2d37dd4/1448188547535-R2PREQ1OVXG1G067S91N/Suai+Loro++%28The+4th+Wall%2C+stories+of+tattoos+%26+body+modification%2C+by+Fareed+Kaviani%29",
        dest: "/Volumes/Genius Art/Antigravity/Bali Tours/images/timor/the4thwall_suai_loro_hands.jpg"
    },
    {
        url: "https://images.squarespace-cdn.com/content/v1/52fecd05e4b0fd11a2d37dd4/1448187629057-7ABG7JSU3N5IMPVD81O9/Portuguese+period+of+tattooing++%28The+4th+Wall%2C+stories+of+tattoos+%26+body+modification%2C+by+Fareed+Kaviani%29",
        dest: "/Volumes/Genius Art/Antigravity/Bali Tours/images/timor/the4thwall_portuguese_period.jpg"
    },
    {
        url: "https://cdn.steemitimages.com/DQmNrNyAcH9CFjUbeb47vyo4xRt5pYzrn1tkibBQkvcjVFj/uma%20lulik.jpg",
        dest: "/Volumes/Genius Art/Antigravity/Bali Tours/images/timor/travelfeed_uma_lulik_house.jpg"
    },
    {
        url: "https://cdn.steemitimages.com/DQmXU68PCd15XT67hqLAR7uKbbwEfczuPGSs5ctV253HxiN/uma%20nain%201.jpg",
        dest: "/Volumes/Genius Art/Antigravity/Bali Tours/images/timor/travelfeed_uma_nain_elder.jpg"
    },
    {
        url: "https://cdn.steemitimages.com/DQmbd2WBRYBPHYipVUup4xzEs4ojcKadoKa8FNRhsMAv24i/1%20uma%20lulik%20vessoru...2.jpg",
        dest: "/Volumes/Genius Art/Antigravity/Bali Tours/images/timor/travelfeed_uma_lulik_vessoru.jpg"
    },
    {
        url: "https://cdn.steemitimages.com/DQmRrEhiow1WksqKyHCvWoN2d74djPf6gR4AKPddtFKrDYE/totem%209.jpg",
        dest: "/Volumes/Genius Art/Antigravity/Bali Tours/images/timor/travelfeed_uma_lulik_totem.jpg"
    }
];

function download(item) {
    return new Promise((resolve, reject) => {
        const parsed = new URL(item.url);
        const client = parsed.protocol === 'https:' ? https : http;
        const req = client.get(item.url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
            }
        }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                const redirectUrl = new URL(res.headers.location, item.url).toString();
                download({ url: redirectUrl, dest: item.dest }).then(resolve).catch(reject);
                return;
            }
            if (res.statusCode !== 200) {
                reject(new Error(`Failed with status ${res.statusCode} for ${item.url}`));
                return;
            }
            const fileStream = fs.createWriteStream(item.dest);
            res.pipe(fileStream);
            fileStream.on('finish', () => {
                fileStream.close();
                const stats = fs.statSync(item.dest);
                console.log(`Saved: ${path.basename(item.dest)} (${stats.size} bytes)`);
                resolve();
            });
        });
        req.on('error', reject);
    });
}

async function run() {
    for (const item of items) {
        try {
            await download(item);
        } catch (err) {
            console.error(`Error downloading ${item.url}:`, err.message);
        }
    }
    console.log("All downloads completed.");
}

run();
