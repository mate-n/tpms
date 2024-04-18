export class CommunicationMethodHelper {
  getIconNameForCommunicationMethod(communicationMethod: string | undefined): string {
    switch (communicationMethod) {
      case 'E-Mail':
        return 'mdi-email-outline'
      case 'Phone':
        return 'mdi-phone-outline'
      case 'Mobile':
        return 'mdi-cellphone'
      case 'Skype':
        return 'mdi-earth'
      default:
        return 'mdi-select-all'
    }
  }
}
