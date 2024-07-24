### Increments the part of the string
## $1: version itself
## $2: number of part: 0 – major, 1 – minor, 2 – patch
function increment_version() {
  local delimiter=.
  local array=($(echo "$1" | tr $delimiter '\n'))
  array[$2]=$((array[$2]+1))
  echo $(local IFS=$delimiter ; echo "${array[*]}")
}

filenameForCurrentVersion=version.demo
if [ ! -f $filenameForCurrentVersion ]
then
    touch $filenameForCurrentVersion
    echo '0.0.1' > $filenameForCurrentVersion
fi

filename=versions.demo
if [ ! -f $filename ]
then
    touch $filename
fi

version=$(head -n 1 $filenameForCurrentVersion)
version=$(increment_version $version 2)
echo "$version" > $filenameForCurrentVersion

echo -e "$version-$1\n$(cat $filename)" > $filename


