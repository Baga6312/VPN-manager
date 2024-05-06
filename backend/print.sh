#!/bin/bash

while true; do
    ss -tulpn | grep ":5000" 	
    sleep 1  # Adjust the sleep duration as needed
done
