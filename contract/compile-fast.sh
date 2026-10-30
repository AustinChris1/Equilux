#!/bin/bash
source $HOME/.local/bin/env
cd /mnt/c/Users/Admin/Desktop/projects/midnightntwrk/contract
compact compile +0.30.0 --skip-zk src/equilux.compact build 2>&1 | tail -25
echo "exit=${PIPESTATUS[0]}"
