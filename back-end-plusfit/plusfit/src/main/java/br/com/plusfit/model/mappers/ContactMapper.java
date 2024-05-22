package br.com.plusfit.model.mappers;


import br.com.plusfit.controller.request.ContactRequestDto;
import br.com.plusfit.controller.request.CustomerRequestDto;
import br.com.plusfit.model.Contact;
import br.com.plusfit.model.Customer;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ContactMapper {

    Contact toEntity(ContactRequestDto contactRequestDto);
}
