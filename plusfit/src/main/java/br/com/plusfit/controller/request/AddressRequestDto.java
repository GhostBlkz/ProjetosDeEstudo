package br.com.plusfit.controller.request;

import br.com.plusfit.model.Address;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AddressRequestDto {
    private Long addressId;
    private String city;
    private String state;
    private String neighbourhood;
    private String street;
    private Integer addressNumber;
    private Integer zipCode;

    public AddressRequestDto (final Address address) {
        this.addressId = address.getAddressId();
        this.city = address.getCity();
        this.state = address.getState();
        this.neighbourhood = address.getNeighbourhood();
        this.street = address.getStreet();
        this.addressNumber = address.getAddressNumber();
        this.zipCode = address.getZipCode();
    }
}
