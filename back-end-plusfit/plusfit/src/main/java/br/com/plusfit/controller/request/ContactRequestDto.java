package br.com.plusfit.controller.request;

import br.com.plusfit.model.Contact;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ContactRequestDto {
    private Long contactId;
    private String email;
    private Long phoneNumber;

    public ContactRequestDto (Contact contact) {
        this.contactId = contact.getContactId();
        this.email = contact.getEmail();
        this.phoneNumber = contact.getPhoneNumber();
    }
}
