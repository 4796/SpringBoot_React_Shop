package com.example.Shop.service;

import java.util.HashMap;
import java.util.UUID;

import org.springframework.stereotype.Service;

@Service
public class AuthService {
	private HashMap<String, String> tokenStorage = new HashMap<>(); 

    public String generateToken(String username, String role) throws Exception{
        String token = UUID.randomUUID().toString(); 
        tokenStorage.put(token, username+","+role); 
        return token;
    }

    public String validateTokenAndGetUsernameAndRole(String token) throws Exception{
        return tokenStorage.get(token); 
    }
}
