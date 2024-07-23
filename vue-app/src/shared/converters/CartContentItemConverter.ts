import { TicketHelper } from '@/helpers/TicketHelper'
import type { ICartContentItem } from '../interfaces/ICartContentItem'
import type { ITicket } from '../interfaces/ITicket'
import { DateFormatter } from '@/helpers/DateFormatter'
import type { IConservationFeePrices } from '../interfaces/IConservationFeePrices'

export class CartContentItemConverter {
  ticketHelper = new TicketHelper()
  dateFormater = new DateFormatter()
  convertTicketsToCartContentItems(tickets: ITicket[]): ICartContentItem[] {
    const cartContentItems: ICartContentItem[] = []

    const ticketsGroupedByTicketIdAndDate = this.ticketHelper.groupTicketsByTicketIdAndDate(tickets)
    for (const [ticketId, ticketMap] of ticketsGroupedByTicketIdAndDate) {
      for (const [date, tickets] of ticketMap) {
        const quantity = tickets.length
        const name = tickets[0].Name
        const unitPrice = tickets[0].Price
        cartContentItems.push({ date, quantity, name, unitPrice })
      }
    }

    return cartContentItems
  }

  convertConservationFeesToCartContentItems(
    conservationFeePrices: IConservationFeePrices
  ): ICartContentItem[] {
    const cartContentItems: ICartContentItem[] = []

    if (conservationFeePrices.adult_sa.total > 0) {
      cartContentItems.push({
        date: this.dateFormater.dddotmmdotyyyy(conservationFeePrices.arrivalDate),
        quantity: conservationFeePrices.adult_sa.count,
        name: 'Adult SA',
        unitPrice: parseFloat(conservationFeePrices.adult_sa.price)
      })
    }

    if (conservationFeePrices.child_sa.total > 0) {
      cartContentItems.push({
        date: this.dateFormater.dddotmmdotyyyy(conservationFeePrices.arrivalDate),
        quantity: conservationFeePrices.child_sa.count,
        name: 'Child SA',
        unitPrice: parseFloat(conservationFeePrices.child_sa.price)
      })
    }

    if (conservationFeePrices.adult_sadc.total > 0) {
      cartContentItems.push({
        date: this.dateFormater.dddotmmdotyyyy(conservationFeePrices.arrivalDate),
        quantity: conservationFeePrices.adult_sadc.count,
        name: 'Adult SADC',
        unitPrice: parseFloat(conservationFeePrices.adult_sadc.price)
      })
    }

    if (conservationFeePrices.child_sadc.total > 0) {
      cartContentItems.push({
        date: this.dateFormater.dddotmmdotyyyy(conservationFeePrices.arrivalDate),
        quantity: conservationFeePrices.child_sadc.count,
        name: 'Child SADC',
        unitPrice: parseFloat(conservationFeePrices.child_sadc.price)
      })
    }

    if (conservationFeePrices.adult_int.total > 0) {
      cartContentItems.push({
        date: this.dateFormater.dddotmmdotyyyy(conservationFeePrices.arrivalDate),
        quantity: conservationFeePrices.adult_int.count,
        name: 'Adult INT',
        unitPrice: parseFloat(conservationFeePrices.adult_int.price)
      })
    }

    if (conservationFeePrices.child_int.total > 0) {
      cartContentItems.push({
        date: this.dateFormater.dddotmmdotyyyy(conservationFeePrices.arrivalDate),
        quantity: conservationFeePrices.child_int.count,
        name: 'Child INT',
        unitPrice: parseFloat(conservationFeePrices.child_int.price)
      })
    }
    return cartContentItems
  }
}
