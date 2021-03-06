const seeder = require('mongoose-seed');
const mongoose = require('mongoose');

// Connect to MongoDB via Mongoose
seeder.connect('mongodb+srv://db_goexplore:ProPlayer@cluster0.sila4.mongodb.net/db_goexplore?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}, function () {

  // Load Mongoose models
  seeder.loadModels([
    './models/Category',
    './models/Bank',
    './models/Item',
    './models/Feature',
    './models/Activity',
    './models/Member',
    './models/Image',
    './models/Member',
    './models/Booking',
    './models/Users'
  ]);

  // Clear specified collections
    seeder.clearModels(['Category', 'Bank', 'Item', 'Member', 'Item', 'Feature', 'Image', 'Booking', 'Users'], function () {

    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function () {
        seeder.disconnect();
    });

    });
});

let data = [
    {
        'model' : 'Category',
        'documents': [
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc901111'),
                name: 'Awesome camping place',
                itemId: [
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902224') },
                    
                ]
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc901112'),
                name: 'Beautiful sight',
                itemId: [
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902225') },
                ]
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc901113'),
                name: 'Village with beauty view',
                itemId: [
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902221') },
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902222') },
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902223') },
                ]
            }
        ]
    },
    {
        'model': 'Item',
        'documents' : [
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902221'),
                title: 'Gitgit Village',
                price: 42,
                sumBooking: 1,
                country: 'Indonesia',
                city: 'Buleleng',
                isPopular: true,
                description: 'Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.',
                unit: 'night',
                imageId: [
                  { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cdb1') },
                  { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cdb2') },
                  { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cdb3') }
                ],
                featureId: [
                  { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa01') },
                  { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa02') },
                  { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa03') },
                  { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa04') }
                ],
                activityId: [
                  { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90bb01') },
                  { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90bb02') },
                ],
                categoryId: '5e96cbe292b97300fc901113'
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902222'),
                title: 'Lamongan Village',
                price: 52,
                sumBooking: 1,
                country: 'Indonesia',
                city: 'Lamongan',
                isPopular: false,
                description: 'Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.',
                unit: 'night',
                imageId: [
                  { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cdb4') },
                  { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cdb5') },
                  { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cdb6') }
                ],
                featureId: [
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa05') },
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa06') },
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa07') },
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa08') }
                  ],
                activityId: [
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90bb01') },
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90bb02') },
                ],
                categoryId: '5e96cbe292b97300fc901113'
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902223'),
                title: 'Ubud Village',
                price: 42,
                sumBooking: 1,
                country: 'Indonesia',
                city: 'Gianyar',
                isPopular: true,
                description: 'Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.',
                unit: 'night',
                imageId: [
                  { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cdb7') },
                  { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cdb8') },
                  { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cdb9') }
                ],
                featureId: [
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa09') },
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa10') },
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa11') },
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa12') }
                  ],
                activityId: [
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90bb01') },
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90bb02') },
                ],
                categoryId: '5e96cbe292b97300fc901113'
            },
            // =====
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902224'),
                title: 'Buyan Camp',
                price: 12,
                sumBooking: 1,
                country: 'Indonesia',
                city: 'Buleleng',
                isPopular: true,
                description: 'Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.',
                unit: 'night',
                imageId: [
                  { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cd10') },
                  { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cd11') },
                  { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cd12') }
                ],
                featureId: [
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa09') },
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa10') },
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa11') },
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa12') }
                  ],
                activityId: [
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90bb01') },
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90bb02') },
                ],
                categoryId: '5e96cbe292b97300fc901111'
            },
            // =====
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902225'),
                title: 'Tangkuban Perahu',
                price: 29,
                sumBooking: 1,
                country: 'Indonesia',
                city: 'Jawa Barat',
                isPopular: true,
                description: 'Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.',
                unit: 'night',
                imageId: [
                  { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cd13') },
                  { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cd14') },
                  { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cd15') }
                ],
                featureId: [
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa09') },
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa10') },
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa11') },
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa12') }
                  ],
                activityId: [
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90bb01') },
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90bb02') },
                ],
                categoryId: '5e96cbe292b97300fc901112'
            },
        ]
    },
    {
        'model': 'Image',
        'documents': [
            // List 1
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cdb1'),
                imageUrl: 'images/image-mostpicked-1.jpg'
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cdb2'),
                imageUrl: 'images/image-mostpicked-2.jpg'
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cdb3'),
                imageUrl: 'images/image-mostpicked-3.jpg'
            },
            // List 2
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cdb4'),
                imageUrl: 'images/image-mostpicked-4.jpg'
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cdb6'),
                imageUrl: 'images/image-mostpicked-5.jpg'
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cdb7'),
                imageUrl: 'images/image-mostpicked-6.jpg'
            },
            // List 3
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cdb8'),
                imageUrl: 'images/image-mostpicked-7.jpg'
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cdb9'),
                imageUrl: 'images/image-mostpicked-8.jpg'
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cdb5'),
                imageUrl: 'images/image-mostpicked-9.jpg'
            },
            // List 4
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cd10'),
                imageUrl: 'images/image-mostpicked-10.jpg'
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cd11'),
                imageUrl: 'images/image-mostpicked-11.jpg'
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cd12'),
                imageUrl: 'images/image-mostpicked-12.jpg'
            },
            // List 5
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cd13'),
                imageUrl: 'images/image-mostpicked-13.jpg'
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cd14'),
                imageUrl: 'images/image-mostpicked-14.jpg'
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cd15'),
                imageUrl: 'images/image-mostpicked-15.jpg'
            },
        ]
      },
    {
        'model': 'Feature',
        'documents' : [
            {
                // Item-1
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa01'),
                name: 'bedroom',
                qty: 2,
                imageUrl: 'images/icon-bedroom.png',
                itemId: mongoose.Types.ObjectId('5e96cbe292b97300fc902221'),
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa02'),
                name: 'living room',
                qty: 1,
                imageUrl: 'images/icon-livingroom.png',
                itemId: mongoose.Types.ObjectId('5e96cbe292b97300fc902221'),
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa03'),
                name: 'televison',
                qty: 2,
                imageUrl: 'images/icon-television.png',
                itemId: mongoose.Types.ObjectId('5e96cbe292b97300fc902221'),
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa04'),
                name: 'mbp/s',
                qty: 5,
                imageUrl: 'images/icon-wifi.png',
                itemId: mongoose.Types.ObjectId('5e96cbe292b97300fc902221'),
            },
            {
                // Item-2
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa05'),
                name: 'bedroom',
                qty: 2,
                imageUrl: 'images/icon-bedroom.png',
                itemId: mongoose.Types.ObjectId('5e96cbe292b97300fc902222'),
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa06'),
                name: 'living room',
                qty: 1,
                imageUrl: 'images/icon-livingroom.png',
                itemId: mongoose.Types.ObjectId('5e96cbe292b97300fc902222'),
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa07'),
                name: 'televison',
                qty: 1,
                imageUrl: 'images/icon-television.png',
                itemId: mongoose.Types.ObjectId('5e96cbe292b97300fc902222'),
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa08'),
                name: 'mbp/s',
                qty: 15,
                imageUrl: 'images/icon-wifi.png',
                itemId: mongoose.Types.ObjectId('5e96cbe292b97300fc902222'),
            },
            {
                // Item-3
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa09'),
                name: 'bedroom',
                qty: 2,
                imageUrl: 'images/icon-bedroom.png',
                itemId: mongoose.Types.ObjectId('5e96cbe292b97300fc902223'),
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa10'),
                name: 'living room',
                qty: 1,
                imageUrl: 'images/icon-livingroom.png',
                itemId: mongoose.Types.ObjectId('5e96cbe292b97300fc902223'),
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa11'),
                name: 'televison',
                qty: 2,
                imageUrl: 'images/icon-television.png',
                itemId: mongoose.Types.ObjectId('5e96cbe292b97300fc902223'),
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa12'),
                name: 'refrigator',
                qty: 1,
                imageUrl: 'images/icon-refrigator.png',
                itemId: mongoose.Types.ObjectId('5e96cbe292b97300fc902223'),
            },
            {
                // Item-4
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa13'),
                name: 'tent',
                qty: 2,
                imageUrl: 'images/icon-tent.png',
                itemId: mongoose.Types.ObjectId('5e96cbe292b97300fc902224'),
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa14'),
                name: 'sleeping bag',
                qty: 2,
                imageUrl: 'images/icon-sleepingbag.png',
                itemId: mongoose.Types.ObjectId('5e96cbe292b97300fc902224'),
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa15'),
                name: 'firewood',
                qty: 2,
                imageUrl: 'images/icon-firewood.png',
                itemId: mongoose.Types.ObjectId('5e96cbe292b97300fc902224'),
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa16'),
                name: 'roaster',
                qty: 1,
                imageUrl: 'images/icon-roaster.png',
                itemId: mongoose.Types.ObjectId('5e96cbe292b97300fc902224'),
            },
        ]
    },
    {
        'model': 'Activity',
        'documents': [
          // done
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90bb01'),
                name: 'Waterfall',
                type: 'gature',
                imageUrl: 'images/activity-1.jpg',
                itemId: mongoose.Types.ObjectId('5e96cbe292b97300fc902221'),
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90bb02'),
                name: 'Strawberry Garden',
                type: 'garden',
                imageUrl: 'images/activity-2.jpg',
                itemId: mongoose.Types.ObjectId('5e96cbe292b97300fc902221'),
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90bb03'),
                name: 'Waterfall',
                type: 'gature',
                imageUrl: 'images/activity-1.jpg',
                itemId: mongoose.Types.ObjectId('5e96cbe292b97300fc902222'),
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90bb04'),
                name: 'Strawberry Garden',
                type: 'garden',
                imageUrl: 'images/activity-2.jpg',
                itemId: mongoose.Types.ObjectId('5e96cbe292b97300fc902222'),
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90bb05'),
                name: 'Waterfall',
                type: 'gature',
                imageUrl: 'images/activity-1.jpg',
                itemId: mongoose.Types.ObjectId('5e96cbe292b97300fc902223'),
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90bb06'),
                name: 'Strawberry Garden',
                type: 'garden',
                imageUrl: 'images/activity-2.jpg',
                itemId: mongoose.Types.ObjectId('5e96cbe292b97300fc902223'),
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90bb07'),
                name: 'Waterfall',
                type: 'gature',
                imageUrl: 'images/activity-1.jpg',
                itemId: mongoose.Types.ObjectId('5e96cbe292b97300fc902224'),
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90bb08'),
                name: 'Strawberry Garden',
                type: 'garden',
                imageUrl: 'images/activity-2.jpg',
                itemId: mongoose.Types.ObjectId('5e96cbe292b97300fc902224'),
            },
        ]
    },
    {
        'model': 'Booking',
        'documents': [
        {
            _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cee1'),
            bookingStartDate: '07-01-2021',
            bookingEndDate: '07-01-2021',
            invoice: 8293743,
            itemId: {
              _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902221'),
              title: 'Gitgit Village',
              price: 42,
              duration: 2,
            },
            total: 2,
            memberId: mongoose.Types.ObjectId('5e96cbe292b97300fc903333'),
            bankId: mongoose.Types.ObjectId('5e96cbe292b97300fc903322'),
            payments: {
                proofPayment: 'images/buktibayar.jpeg',
                bankFrom: 'BRI',
                status: 'Proses',
                accountHolder: 'ang'
            }
        }
        ]
    },
    {
        'model': 'Member',
        'documents': [
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903331'),
                firstName: 'Agung',
                lastName: 'Putrayasa',
                email: 'agungputayasa311@gmail.com',
                phoneNumber: '082312454008'
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903332'),
                firstName: 'Yein',
                lastName: 'Narayana',
                email: 'yeinnarayana89@gmail.com',
                phoneNumber: '082377954008'
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903333'),
                firstName: 'Rikal',
                lastName: 'Cahyadi',
                email: 'rikalcahyadi@gmail.com',
                phoneNumber: '089088943344'
            }
        ]
    },
    {
        'model': 'Bank',
        'documents': [
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903321'),
                nameBank: 'Mandiri',
                nomorRekening: '1813951031795138',
                name: 'Radit',
                imageUrl: 'images/logo-Mandiri.png'
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903322'),
                nameBank: 'BRI',
                nomorRekening: '9134190381719573',
                name: 'Rikal',
                imageUrl: 'images/logo-BRI.png'
            }
        ]
    },
    {
        'model': 'Users',
        'documents': [
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903345'),
                username: 'Rades',
                password: '2021',
            },
        ]
      }
]