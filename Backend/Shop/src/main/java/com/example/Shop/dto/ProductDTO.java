package com.example.Shop.dto;

import java.time.LocalDate;
import java.util.List;

import com.example.Shop.model.Client;
import com.example.Shop.model.Currency;
import com.example.Shop.model.Product;
import com.fasterxml.jackson.annotation.JsonFormat;

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
public class ProductDTO implements DTO{
	

	private int id;//nije obavezno, samo generise
	@NotNull(message = "name required. ")
	private String name;
	@NotNull(message = "price required. ")
	private double price;
	@NotNull(message = "description required. ")
	private String description;
	@NotNull(message = "brand required. ")
	private String brand;
	@NotNull(message = "category required. ")
	private String category;
	
	//@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate date;//samo se generise
	
	private boolean available;//samo generise
	
	@NotNull(message = "quantity required. ")
	private int quantity; 
	
	@NotNull(message = "image required. ")
	private String image;
	
	
	
}
