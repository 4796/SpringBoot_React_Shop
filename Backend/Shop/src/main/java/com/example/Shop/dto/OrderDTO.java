package com.example.Shop.dto;

import java.util.List;

import com.example.Shop.model.Client;
import com.example.Shop.model.Currency;
import com.example.Shop.model.Product;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO implements DTO{
	

	private Integer id;//nije obavezno jer se kreira
	@NotNull(message = "client required. ")
	private ClientDTO client;
	@NotNull(message = "product required. ")
	private ProductDTO product;
	@NotNull(message = "address required. ")
	private String adress;
	//private boolean delivered;//mozda ne treba
	
	
	
	
}
