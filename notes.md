# CS 260 Notes

[My startup](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## setting up the server
### commands
sudo stands for super user do
vi Caddyfile starts editing Caddyfile in vim - use i to insert and edit the code and : to execute a command (save and exit -> :wq)
ssh -i .\CS-260-Server/cs260-david.pem ubuntu@100.25.32.157
the ip address at the end is the one that was set up on aws as an elastic ip address so the server doesn't change ip address every time it's run
## AWS notes
-caddy takes care of making a secure connection - https://startup.mindboggle.org/
-aws is what runs the server itself, run with a default format (ami image, created by prof. Jensen) in us-east-1 N. Virginia 
-the ec2 instance is the actual server made on a computer in virginia (remember the one brought in)
-route 53 is the aws tool we used to pick a domain name with DNS (domain name system)
-once bought (mindboggle.org $14 a year, next time do .click for $3 a year haha) it needed time to be verified and created so a hosted zone was created
# NOW ANYONE CAN ACCESS mindboggle.org :)

## HTML Notes
<img src = "" alt = ""></img> to put in a picture
<a href = ""></a> to put in a link
