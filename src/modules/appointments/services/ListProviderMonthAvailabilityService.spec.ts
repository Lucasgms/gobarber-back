import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabityService: ListProviderMonthAvailabityService;

describe('ListProviderMonthAvailabity', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailabityService = new ListProviderMonthAvailabityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the provider month availabity', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      customer_id: '123456',
      date: new Date(2020, 7, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      customer_id: '123456',
      date: new Date(2020, 7, 20, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      customer_id: '123456',
      date: new Date(2020, 7, 20, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      customer_id: '123456',
      date: new Date(2020, 7, 20, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      customer_id: '123456',
      date: new Date(2020, 7, 20, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      customer_id: '123456',
      date: new Date(2020, 7, 20, 13, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      customer_id: '123456',
      date: new Date(2020, 7, 20, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      customer_id: '123456',
      date: new Date(2020, 7, 20, 15, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      customer_id: '123456',
      date: new Date(2020, 7, 20, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      customer_id: '123456',
      date: new Date(2020, 7, 20, 17, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      customer_id: '123456',
      date: new Date(2020, 7, 20, 18, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      customer_id: '123456',
      date: new Date(2020, 7, 21, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailabityService.execute({
      provider_id: 'user',
      year: 2020,
      month: 8,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 19, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
