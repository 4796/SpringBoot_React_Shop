package com.example.Shop.converter.impl;

import org.springframework.stereotype.Component;

import com.example.Shop.converter.ConverterDtoEntity;
import com.example.Shop.dto.ClientDTO;
import com.example.Shop.dto.WorkerDTO;
import com.example.Shop.model.Client;
import com.example.Shop.model.Worker;

@Component
public class WorkerConverterDtoEntity implements ConverterDtoEntity<WorkerDTO, Worker> {

	@Override
	public WorkerDTO toDto(Worker e) {
		return new WorkerDTO(e.getUsername(), e.getPassword(), e.getName(), e.getCity(), e.getPhone_number(), e.getToken(), e.getPay());
	}

	@Override
	public Worker toEntity(WorkerDTO dto) {
		
		Worker w=new Worker(dto.getPay(), null);
		w.setUsername(dto.getUsername());
		w.setPassword(dto.getPassword());
		w.setName(dto.getName());
		w.setCity(dto.getCity());
		w.setPhone_number(dto.getPhone_number());
		w.setToken(dto.getToken());
		return w;
	}

}