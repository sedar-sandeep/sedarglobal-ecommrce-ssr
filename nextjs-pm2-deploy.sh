echo "Deploy starting..."

npm run install || exit

BUILD_DIR=temp npm run build || exit

if [ ! -d "temp" ]; then
  echo '\033[31m temp Directory not exists!\033[0m'  
  exit 1;
fi

rm -rf .next

mv temp .next

pm2 reload all --update-env
pm2 reset all

echo "Deploy done."
