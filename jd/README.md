1、ck和平台设备无关，同一个ck在windows和mac都可以登录
2、

pip install selenium
pip install undetected-chromedriver
pip install requests

-----------------------------------------------
pip 环境问题，在Ubuntu

安装虚拟环境     sudo apt-get install python3-venv
新建jd环境      python3 -m venv jd
进入jd环境      source jd/bin/activate
退出jd环境      deactivate

使用python3.9
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt-get update
sudo apt-get install python3.9
sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.9 1

第二次✅
安装python多版本 3.9.6，使用这个方法安装不需要另外配虚拟环境
https://blog.csdn.net/a8039974/article/details/142760557

如果pyenv下载不了，就单独下载，再直接安装
wget https://www.python.org/ftp/python/3.9.6/Python-3.9.6.tar.xz
tar -xf Python-3.9.6.tar.xz
cd Python-3.9.6
./configure --enable-optimizations
make -j$(nproc)
make altinstall
pyenv install --list | grep " 3.9.6 "  # 确认版本号正确无误

【安装Chrome】✅
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt-get update
sudo apt install ./google-chrome-stable_current_amd64.deb
注意修改chromedriver的权限
------------------------------------------------
pipx

sudo apt update && sudo apt install pipx

pipx install selenium --include-deps
pipx install undetected-chromedriver
pipx install requests

<!-- pip3 install pyautogui 鼠标点击 -->
<!-- pip3 install Pillow 图像处理 -->

<!-- pip install mysql-connector-python mysql数据库 -->

---------------------------------
Chrome浏览器自动升级导致driver失效
因此需要关闭Chrome的自动升级

**以下两个都未测试

1、通过 apt 锁定版本 sudo apt-mark hold google-chrome-stable

2、通过Chrome的策略管理浏览器的行为
创建一个 JSON 配置文件，例如 policies.json：
{
    "DisableBackgroundMode": true,
    "DisableBackgroundNetworking": true,
    "DisableBackgroundTimer": true,
    "UpdateDefault": "none"
}
将此文件放置在 /etc/opt/chrome/policies/managed/ 目录下。
确保 Chrome 用户有权限读取此文件。
