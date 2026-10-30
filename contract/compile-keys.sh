#!/bin/bash
source $HOME/.local/bin/env
cd /mnt/c/Users/Admin/Desktop/projects/midnightntwrk/contract
start=$(date +%s)
compact compile +0.30.0 src/equilux.compact build 2>&1 | tail -20
echo "exit=${PIPESTATUS[0]} seconds=$(( $(date +%s) - start ))"
ls -la build/keys
