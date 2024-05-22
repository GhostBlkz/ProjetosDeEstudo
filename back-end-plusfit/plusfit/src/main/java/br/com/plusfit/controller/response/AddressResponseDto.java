package br.com.plusfit.controller.response;

import br.com.plusfit.model.Address;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AddressResponseDto {

    private Long addressId;
    private String city;
    private String state;
    private String neighbourhood;
    private String street;
    private Integer addressNumber;
    private Integer zipCode;
    private Boolean active;

    public AddressResponseDto (final Address address) {
        this.addressId = address.getAddressId();
        this.city = address.getCity();
        this.state = address.getState();
        this.neighbourhood = address.getNeighbourhood();
        this.street = address.getStreet();
        this.addressNumber = address.getAddressNumber();
        this.zipCode = address.getZipCode();
        this.active = address.getActive();
    }
}
