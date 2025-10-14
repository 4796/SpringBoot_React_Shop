package com.example.Shop.dto;

import java.util.List;

import com.example.Shop.model.Currency;
import com.example.Shop.model.Product;

import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ClientDTO implements DTO{
	
	@NotNull(message = "username required. ")
	@Size(min = 3, message = "username needs to have atleast 3 characters. ")
	private String username;
	@NotNull(message = "password required. ")
	private String password;
	@NotNull(message = "name required. ")
	private String name;//novo
	@NotNull(message = "city required. ")
	private String city;//novo
	@NotNull(message = "phone number required. ")
	@Pattern(
		    regexp = "^\\+?[0-9]+$",
		    message = "Phone number must contain only digits and an optional '+' at the beginning."
		)
	private String phone_number;//novo
	
    private String token; 
    
  //sva tri nova
    @NotNull(message = "country required. ")
  	private String country;
    @NotNull(message = "postal code required. ")
  	private String postal_code;
    @NotNull(message = "currency required. ")
  	private Currency currency;
  	
  	List<Product> productsInCart;


  	
  	
  	
}
