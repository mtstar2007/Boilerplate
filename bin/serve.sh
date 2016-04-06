#!/bin/bash


PYTHON3=`which python3`;

if [ "$PYTHON3" != "" ]; then
	$PYTHON3 -m http.server 1337;
fi;

