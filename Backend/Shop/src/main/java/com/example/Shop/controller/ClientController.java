package com.example.Shop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Shop.model.Client;
import com.example.Shop.model.User;
import com.example.Shop.service.UserService;

@RestController
@CrossOrigin
@RequestMapping("/client")
public class ClientController {
	
	@Autowired
	UserService userService;
	
	//new client
		//client     da
		@PostMapping("/register")
		public ResponseEntity<User> register(@RequestBody Client client){
			Client c=userService.register(client);
			if(c==null)
				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			else
				return  new ResponseEntity<>(HttpStatus.OK);
		}
}
