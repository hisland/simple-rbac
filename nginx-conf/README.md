## 安装

将 nginx/nginx-aliyun-cc-manager-v3.conf link 到 /etc/nginx/conf.d 下面


## 本地开发

本地开发时, 设置端口转发到本地
```
ssh -nNT -R 9612:localhost:9612 h2dl-aliyun
```
然后使用 cc-v3-dev.tmsay.com 访问
