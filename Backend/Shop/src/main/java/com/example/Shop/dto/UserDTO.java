package com.example.Shop.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserDTO implements DTO{

	@NotNull(message = "username required. ")
	@Size(min = 3, message = "username needs to have atleast 3 characters. ")
	private String username;
	@NotNull(message = "password required. ")
	private String password;
}
