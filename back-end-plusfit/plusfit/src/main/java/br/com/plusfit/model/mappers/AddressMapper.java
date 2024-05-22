package br.com.plusfit.model.mappers;


import br.com.plusfit.controller.request.AddressRequestDto;
import br.com.plusfit.controller.request.CustomerRequestDto;
import br.com.plusfit.model.Address;
import br.com.plusfit.model.Customer;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AddressMapper {

    Address toEntiity(AddressRequestDto addressRequestDto);
}
