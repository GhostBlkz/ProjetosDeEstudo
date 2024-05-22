package br.com.plusfit.model.mappers;


import br.com.plusfit.controller.request.CustomerRequestDto;
import br.com.plusfit.controller.request.EnrollmentRequestDto;
import br.com.plusfit.model.Customer;
import br.com.plusfit.model.Enrollment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EnrollmentMapper {

    Enrollment toEntity(EnrollmentRequestDto enrollmentRequestDto);
}
