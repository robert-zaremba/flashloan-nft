# Whenever we change the themes we need to regenerate the antd main style
# USAGE
#  1. run `./antd-generate.sh full` from this directory if you updated antd library
#     OR if you do it for the very first time after clonning the repository.
#  2. Otherwise (eg if you changed the customization) the only run:
#      ./antd-generate.sh

cd ../../node_modules/antd/lib/style

if [ $# -eq 1 ]; then
    if [ "$1" != "full" ]; then
        echo -e "Wrong argument. The first optional argument must be 'full':\n\t./antd-generate.sh full"
        exit 1;
    fi

    echo "Copying files to antd - doing full update."

    mv themes themes.back
    ln -sf ../../../../src/styles/themes .

    cd color
    mv colors.less colors.back.less 2> /dev/null
    cd ..
    cp ../../../../src/styles/colors.less ./
    echo "" >> colors.less
    echo "@import './color/colorPalette';" >> colors.less
fi

# now we need to copy the antd css styles

../../../.bin/lessc --js index.less > antd_core.css
../../../.bin/lessc --js components.less > antd_components.css

mv antd_*.css ../../../../src/styles/
