import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailabity', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the provider day availabity', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      customer_id: 'customer',
      date: new Date(2020, 7, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      customer_id: 'customer',
      date: new Date(2020, 7, 20, 10, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 20, 11).getTime();
    });

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: 'user',
      year: 2020,
      month: 8,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: true },
        { hour: 15, available: true },
      ]),
    );
  });
});
