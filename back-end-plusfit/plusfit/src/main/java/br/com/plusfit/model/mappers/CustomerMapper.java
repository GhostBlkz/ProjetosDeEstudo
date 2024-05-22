package br.com.plusfit.model.mappers;


import br.com.plusfit.controller.request.CustomerRequestDto;
import br.com.plusfit.model.Customer;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface CustomerMapper {

    Customer toEntity(CustomerRequestDto customerDto);
}
