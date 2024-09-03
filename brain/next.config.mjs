/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {hostname: "pbs.twimg.com"} ,
            {hostname :"w7.pngwing.com"},
            {hostname :"silicondales.com"},
            {hostname :"encrypted-tbn0.gstatic.com"},
            {hostname :"t3.ftcdn.net"},
            {hostname :"png.pngtree.com"},
            {hostname :"i.insider.com"},
            {hostname :"upload.wikimedia.org"}
        ]
    }
};

export default nextConfig;
