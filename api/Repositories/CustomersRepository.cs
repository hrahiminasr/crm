using MongoDB.Bson.Serialization.Conventions;

namespace api.Repositories;

public class CustomersRepository : ICustomersRepository
{
    private const string _collectionName = "customers";
    private readonly IMongoCollection<Customers> _collection;
    public CustomersRepository(IMongoClient client, IMongoDbSettings dbSettings)
    {
        var dbName = client.GetDatabase(dbSettings.DatabaseName);
        _collection = dbName.GetCollection<Customers>(_collectionName);
    }

    public async Task<CustomersUserDto?> Create(RegisterCustomersDto cusInput, CancellationToken cancellationToken)
    {
        bool doesExist = await _collection.Find<Customers>(custom =>
            custom.MobilePhone.Trim() == cusInput.MobilePhone.Trim()).AnyAsync(cancellationToken);

        if (doesExist)
            return null;

        Customers customers = new Customers(
            Id: null,
            Name: cusInput.Name.Trim().ToLower(),
            NationallCode: cusInput.NationallCode?.Trim(),
            EconomicCode: cusInput.EconomicCode?.Trim(),
            MobilePhone: cusInput.MobilePhone.Trim(),
            PhoneNumber: cusInput.PhoneNumber?.Trim(),
            State: cusInput.State.Trim().ToLower(),
            City: cusInput.City.Trim().ToLower(),
            Address: cusInput.Address?.Trim(),
            FactoryAddress: cusInput.FactoryAddress?.Trim(),
            ZipeCode: cusInput.ZipeCode?.Trim()
        );

        if (_collection is not null)
            await _collection.InsertOneAsync(customers, null, cancellationToken);

        if (customers.Id is not null)
        {
            CustomersUserDto customersUserDto = new CustomersUserDto(
                Id: customers.Id,
                Name: customers.Name,
                MobilePhone: customers.MobilePhone,
                State: customers.State,
                City: customers.City
            );

            return customersUserDto;
        }

        return null;
    }

    public async Task<List<CustomersUserDto>?> GetAllAsync(CancellationToken cancellationToken)
    {
        List<Customers> customers = await _collection.Find<Customers>(new BsonDocument()).ToListAsync(cancellationToken);

        List<CustomersUserDto> customersUserDtos = new List<CustomersUserDto>();

        if (customers.Any())
        {
            foreach (Customers customer in customers)
            {
                CustomersUserDto customersUserDto = new CustomersUserDto(
                    Id: customer.Id,
                    Name: customer.Name,
                    MobilePhone: customer.MobilePhone,
                    State: customer.State,
                    City: customer.City
                );

                customersUserDtos.Add(customersUserDto);
            }

            return customersUserDtos;
        }
        
        return customersUserDtos;
    }

    public async Task<DeleteResult> Delete(string userMobilePhone)
    {
        return await _collection.DeleteOneAsync<Customers>(doc => doc.MobilePhone == userMobilePhone);
    }

    public async Task<UpdateResult> UpdateUserById(string userId, Customers userIn, CancellationToken cancellationToken)
    {
        var updateUser = Builders<Customers>.Update
        .Set(doc => doc.Name, userIn.Name)
        .Set(doc => doc.NationallCode, userIn.NationallCode)
        .Set(doc => doc.EconomicCode, userIn.EconomicCode)
        .Set(doc => doc.MobilePhone, userIn.MobilePhone)
        .Set(doc => doc.PhoneNumber, userIn.PhoneNumber)
        .Set(doc => doc.State, userIn.State)
        .Set(doc => doc.City, userIn.City)
        .Set(doc => doc.Address, userIn.Address)
        .Set(doc => doc.FactoryAddress, userIn.FactoryAddress)
        .Set(doc => doc.ZipeCode, userIn.ZipeCode);

        return await _collection.UpdateOneAsync<Customers>(doc => doc.Id == userId, updateUser);
    }
}
