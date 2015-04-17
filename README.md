# Development Setup

## Vagrant

Vagrant VMs are almost perfect apart from the default Shared Folder mechanism. In VirtualBox, the vboxfs shared folder has a number of shortcomings:
 
### Lacks symbolic link support

This can be hacked using: 

```
  config.vm.provider "virtualbox" do |vb|
      vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/vagrant", "1"]
  end
```

Additionally, if using Windows, the non Admin user must be provided with [create symbolic link permissions](http://superuser.com/questions/124679/how-do-i-create-a-link-in-windows-7-home-premium-as-a-regular-user?answertab=votes#125981).

The above "works" but is less than ideal

### Does not expose file changes

This is a critical issue as LiveReload or WebPack's Hot Reload never detects file changes. Any files in the /vagrant share will not be reloaded on file change.

### Workaround 1

Use an alternative sync method such as RSYNC or [Vagrant Unision](https://github.com/mrdavidlaing/vagrant-unison)

### Workaround 2

Configure your IDE/Text Editor to remote sync all files on change. WebStorm, for example, provides a facility where project files can be synced using SFTP.
