# Rails-API-React-Tutorial 💻 [![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

Hey! This is a super-easy to follow Rails/React API tutorial that is fully in depth from start to finish. This guide shows you how to install Ruby
and Rails 5 in a Virtual Box, React JS via create-react-app and connecting the frontend and backend.

## Table of Contents 
* Downloading Virtual Box
* Downloading create-react-app
* Creating a Rails API
* Create a react frontend
* Connect the API with React


## Downloading Virtual Box

- Why Virtual Box? What is it? 
We'll be using Ubuntu to work with our rails applications so it'll be more organized for us to be working in a virtual enviorment! You can always destroy
the enviorment and reconfigure whenever you want. 

1. Download VirtualBox 5.2.22 for Mac OSX [here,](https://download.virtualbox.org/virtualbox/5.2.22/VirtualBox-5.2.22-126460-OSX.dmg) or Windows [here](https://download.virtualbox.org/virtualbox/5.2.22/VirtualBox-5.2.22-126460-Win.exe)
2. Run the installer.
3. Download Vagrant for Mac OSX [here,](https://releases.hashicorp.com/vagrant/2.2.0/vagrant_2.2.0_x86_64.dmg) or Windows [here](https://releases.hashicorp.com/vagrant/2.2.0/vagrant_2.2.0_x86_64.msi)
4. Let's create our first enviorment. You can run the script below to keep your rails projects on your Desktop.

```
cd /Desktop && mkdir rails && cd rails && vagrant init
```
5. Download the OS to VirtualBox
```
vagrant box add ubuntu/trusty64
```
6. Double check and make sure our new box is there
```
vagrant box list
```
7. Add this script to the Vagrant File
```
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"
end
```
8. Start the vagrant server
```
vagrant up && vagrant ssh
```
9. Direct yourself to the vagrant directory
```
cd /vagrant
```
10. Add our Bootstrap File
```
mkdir new_project && cd new_project && touch bootstrap.sh
```
11. Copy this script to configure our virtual enviorment 
```
#!/usr/bin/env bash
# upgrade and update the system
echo upgrading and updating the system
sudo apt-get update
sudo apt-get -y upgrade
# install node.js for js runtime when using Rails
echo installing nodejs for ExecJS runtime and git
sudo apt-get install -y nodejs
sudo apt-get install -y git
# install RVM
echo installing RVM
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
\curl -sSL https://get.rvm.io | bash -s stable
source /home/vagrant/.rvm/scripts/rvm
rvm requirements
# install Ruby and make 2.3.1 the default
echo installing ruby
rvm install 2.3.1
rvm use 2.3.1 --default
# install Bundler and Rails
echo installing bundler and rails
gem install bundler --no-ri --no-rdoc
gem install rails -v 4.2.7 --no-ri --no-rdoc
# install postgres and its dependencies
echo installing psql and its dependencies
sudo apt-get install -y postgresql postgresql-contrib libpq-dev
```
12. Re-edit the vagrant file for our newest editions + new bootstrap file
```
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.network "forwarded_port", guest: 3000, host: 3000, host_ip: "127.0.0.1"
  config.vm.provision :shell, path: "bootstrap.sh", privileged: false
  config.vm.provider "virtualbox" do |vb|
    vb.customize ["modifyvm", :id, "--memory", "2048"]
    vb.customize ["modifyvm", :id, "--cpus", "2"]
  end
end

```
13. Open a new tab in your terminal and lets test the vagrant configs
```
vagrant halt && vagrant up --provision
```
14. Last step. whew...! Once your vagrant server is on (vagrant up and vagrant ssh!), check that Ruby and Rails was installed!
``` 
ruby -v 
```
## Downloading create-react-app

First we need Node Packet Manager if you dont already. You can download it [here.](https://www.npmjs.com/get-npm) Run the installer and save settings so npm is saved globally. 

Let's begin!

1. run ``` npm install -g create-react-app``` and let the files download to your drive.

  1a. If you are running problems with the ```ERR!``` message, try using ```sudo``` to run privileges as administrator. 
  
2. Let's create a test app to see if everything is running smoothly. type ``` create-react-app my-cool-app``` in the command line and see if everything installs. ``` my-cool-app``` will be the name of your react project.

3. Run ``` npm start ``` and type Y in case there are some conflicting port configs in your local host. You should see the bottom image in your browser if everything was installed correctly!

<a href="http://tinypic.com?ref=2gwysso" target="_blank"><img src="http://i68.tinypic.com/2gwysso.png" border="0" alt="Image and video hosting by TinyPic"></a>
