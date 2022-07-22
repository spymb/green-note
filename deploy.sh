rm -rf dist &&
yarn build &&
cd dist &&
git init &&
git add . &&
git commit -m "deploy" &&
git branch -M master &&
git remote add origin git@gitee.com:spym404/green-note.git &&
git push -f -u origin master &&
cd -
