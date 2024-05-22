package br.com.plusfit.controller.response;

import br.com.plusfit.model.Contact;
import lombok.Data;

@Data
public class ContactResponseDto {
    private Long contactId;
    private String email;
    private Long phoneNumber;
    private Boolean active;

    public ContactResponseDto (Contact contact) {
        this.contactId = contact.getContactId();
        this.email = contact.getEmail();
        this.phoneNumber = contact.getPhoneNumber();
        this.active = contact.getActive();
    }
}
