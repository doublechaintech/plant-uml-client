all:
	PUBLIC_URL=./ yarn build
	rsync -avz -e "ssh -p 6543" build/* philip@t420.doublechaintech.cn:/data/upload/plantuml/