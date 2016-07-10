# use tcpdump to make sure there is no complete resync on reconnect

sudo tcpdump -i lo 'tcp port 3100 and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12]&0xf0)>>2)) != 0)' -X
