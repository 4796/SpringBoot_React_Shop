package com.example.Shop.converter.impl;

import org.springframework.stereotype.Component;

import com.example.Shop.converter.ConverterDtoEntity;
import com.example.Shop.dto.ClientDTO;
import com.example.Shop.dto.UserDTO;
import com.example.Shop.model.Client;
import com.example.Shop.model.User;

import lombok.NoArgsConstructor;

@NoArgsConstructor
@Component
public class UserConverterDtoEntity implements ConverterDtoEntity<UserDTO, User> {

	@Override
	public UserDTO toDto(User e) {
		UserDTO u=new UserDTO();
		u.setUsername(e.getUsername());
		u.setPassword(e.getPassword());
		return u;
	}

	@Override
	public User toEntity(UserDTO dto) {
		User u=new User();
		u.setUsername(dto.getUsername());
		u.setPassword(dto.getPassword());
		return u;
	}

}