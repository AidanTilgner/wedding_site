interface Guest {
  first_name: string;
  last_name: string;
  title: string;
  email: string;
  phone: string;
  group: string;
  side: "Groom" | "Bride";
  id: string;
  wedding_party: boolean;
  rsvp: boolean;
  invitation_message: string;
}
