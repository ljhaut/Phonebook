#!/bin/sh
npm run build
rm -rf ~/Desktop/Part3/phonebook-back/build
cp -r build ~/Desktop/Part3/phonebook-back