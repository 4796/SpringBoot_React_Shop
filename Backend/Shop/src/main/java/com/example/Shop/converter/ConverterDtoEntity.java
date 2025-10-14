package com.example.Shop.converter;

import com.example.Shop.model.GenericEntity;
import com.example.Shop.dto.DTO;

public interface ConverterDtoEntity<Dto extends DTO,E extends GenericEntity> {
	public Dto toDto(E e);
	public E toEntity(Dto dto);
}
