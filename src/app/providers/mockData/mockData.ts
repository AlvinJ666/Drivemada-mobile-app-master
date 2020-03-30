import {Injectable} from '@angular/core';
import {of} from 'rxjs';


@Injectable()
export class MockData {

    constructor() {
    }

    static mockApiGet(endpoint: string, seq: any) {

    // Calendar
    if (endpoint === 'work-offers/client/booked') {
      seq = this.getBookedOffersAsClient();
    }

    if (endpoint === 'work-offers/client/history') {
      seq = this.getWorkOfferHistoryAsClient();
    }

    if (endpoint === 'threads') {  // getThreads
      seq = this.getMockThreads();
    }

        if (endpoint.match(/threads\/[0-9]+/)) {  // getThreadMessages
            seq = this.getMockMessages(endpoint.split('/')[1]);
        }

        if (endpoint.match(/users\/[0-9]+/)) {  // getUserProfile
            seq = this.getMockProfile(endpoint.split('/')[1]);
        }

        if (endpoint === 'photos') {  // getPhotos
            seq = this.getMockPhotos();
        }

        if (endpoint.match(/users\/[0-9]+\/reviews/ )) { // get reviews
            seq = this.getMockReviews(endpoint.split('/')[1]);
        }

        if (endpoint === 'users/me/shifts') {  // getMyShifts
            seq = this.getMockMyShifts();
        }

        if (endpoint === 'users/me') {  // get self profile
            seq = this.getMockSelfProfile();
        }

        return seq;
    }

    static mockApiPost(endpoint: string, seq: any) {

        if (endpoint === 'work-offers') {  // getThreads
            seq = this.postMockSearch();
        }

        return seq;
    }

     static getMockMessages(id: string) {

        switch (id) {
            case '1':
                return of({
                    data: {
                        items: [
                            {
                                id: 1,
                                idFrom: 10,
                                idTo: 20,
                                nameFrom: 'Fadi',
                                nameTo: 'Ange',
                                text: 'Can I book you for a visit on Friday?',
                                createdDateUTC: '2019-03-07 08:02:58'
                            },
                            {
                                id: 2,
                                idFrom: 20,
                                idTo: 10,
                                nameFrom: 'Ange',
                                nameTo: 'Fadi',
                                text: 'What time is good for you?',
                                createdDateUTC: '2019-03-08 06:02:58'
                            },
                            {
                                id: 3,
                                idFrom: 10,
                                idTo: 20,
                                nameFrom: 'Fadi',
                                nameTo: 'Ange',
                                text: '6 PM',
                                createdDateUTC: '2019-03-10 07:02:58'
                            },
                            {
                                id: 4,
                                idFrom: 20,
                                idTo: 10,
                                nameFrom: 'Ange',
                                nameTo: 'Fadi',
                                text: 'Yes. I\'ll see you then!',
                                createdDateUTC: '2019-03-13 06:02:58'
                            },
                            {
                                id: 5,
                                idFrom: 10,
                                idTo: 20,
                                nameFrom: 'Fadi',
                                nameTo: 'Ange',
                                text: 'Thank you!',
                                createdDateUTC: '2019-03-14 02:02:58'
                            }
                        ]
                    }
                });
            case '2':
                return of({
                    data: {
                        items: [
                            {
                                id: 1,
                                idFrom: 10,
                                idTo: 30,
                                nameFrom: 'Fadi',
                                nameTo: 'Rick',
                                text: 'Can I book you for a visit on Saturday?',
                                createdDateUTC: '2019-04-01 08:02:58'
                            },
                            {
                                id: 2,
                                idFrom: 30,
                                idTo: 10,
                                nameFrom: 'Rick',
                                nameTo: 'Fadi',
                                text: 'Not really.. would Sunday at 10 PM work for you?',
                                createdDateUTC: '2019-04-02 06:02:58'
                            },
                            {
                                id: 3,
                                idFrom: 10,
                                idTo: 30,
                                nameFrom: 'Fadi',
                                nameTo: 'Rick',
                                text: 'Yes, that works for me.',
                                createdDateUTC: '2019-04-03 07:02:58'
                            },
                            {
                                id: 4,
                                idFrom: 30,
                                idTo: 10,
                                nameFrom: 'Rick',
                                nameTo: 'Fadi',
                                text: 'Sounds good! See you then!',
                                createdDateUTC: '2019-04-04 06:02:58'

                            }
                        ]
                    }
                });
            case '3':
                return of({
                    data: {
                        items: [
                            {
                                id: 1,
                                idFrom: 10,
                                idTo: 40,
                                nameFrom: 'Fadi',
                                nameTo: 'Steph',
                                text: 'Can I book you for a visit on Sunday?',
                                createdDateUTC: '2019-04-08 08:02:58'
                            },
                            {
                                id: 2,
                                idFrom: 40,
                                idTo: 10,
                                nameFrom: 'Steph',
                                nameTo: 'Fadi',
                                text: 'Yes. What time do you need it for?',
                                createdDateUTC: '2019-04-09 06:02:58'
                            },
                            {
                                id: 3,
                                idFrom: 10,
                                idTo: 40,
                                nameFrom: 'Fadi',
                                nameTo: 'Steph',
                                text: '5 PM',
                                createdDateUTC: '2019-04-10 07:02:58'
                            },
                            {
                                id: 4,
                                idFrom: 40,
                                idTo: 10,
                                nameFrom: 'Steph',
                                nameTo: 'Fadi',
                                text: 'Yes I will be there at 5 PM',
                                createdDateUTC: '2019-04-11 06:02:58'
                            }

                        ]
                    }
                });
            default:
                return of({
                    data: {
                        items: [
                            {
                                id: 1,
                                idFrom: 10,
                                idTo: 40,
                                nameFrom: 'Fadi',
                                nameTo: 'Steph',
                                text: 'Can I book you for a visit on Sunday?',
                                createdDateUTC: '2019-04-08 08:02:58'
                            },
                            {
                                id: 2,
                                idFrom: 40,
                                idTo: 10,
                                nameFrom: 'Steph',
                                nameTo: 'Fadi',
                                text: 'Yes. What time do you need it for?',
                                createdDateUTC: '2019-04-09 06:02:58'
                            },
                            {
                                id: 3,
                                idFrom: 10,
                                idTo: 40,
                                nameFrom: 'Fadi',
                                nameTo: 'Steph',
                                text: '5 PM',
                                createdDateUTC: '2019-04-10 07:02:58'
                            },
                            {
                                id: 4,
                                idFrom: 40,
                                idTo: 10,
                                nameFrom: 'Steph',
                                nameTo: 'Fadi',
                                text: 'Yes I will be there at 5 PM',
                                createdDateUTC: '2019-04-11 06:02:58'
                            }

                        ]
                    }
                });
        }
    }

    static getMockProfile(id: string) {

        switch (id) {
            case '10':
                return of({
                    data:
                        {
                            id: 10,
                            profilePicture: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?size=200',
                            registerDate: '2018-04-03 04:59:27',
                            avgRating: 5,
                            totalReviews: 20,
                            isCaregiver: false,
                            firstName: 'Fadi',
                            lastName: 'Doe',
                            about: 'Praesent egestas hendrerit rhoncus. Vivamus sagittis blandit purus sit amet egestas.',
                            location: {
                                city: 'Ottawa',
                                area: 'ON',
                                postalCode: 'K1P1A4',
                                country: 'CA'
                            },
                        },

                });

            case '20':
                return of({
                    data:
                        {
                            id: 20,
                            profilePicture: 'https://images.unsplash.com/photo-1498529605908-f357a9af7bf5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
                            registerDate: '2018-04-03 04:59:27',
                            avgRating: 3,
                            totalReviews: 20,
                            isCaregiver: false,
                            firstName: 'Ange',
                            lastName: 'Nana',
                            about: 'Praesent egestas hendrerit rhoncus. Vivamus sagittis blandit purus sit amet egestas.',
                            location: {
                                city: 'Ottawa',
                                area: 'ON',
                                postalCode: 'K1P1A4',
                                country: 'CA'
                            },
                        },

                });
            case '30':
                return of({
                    data:
                        {
                            id: 30,
                            profilePicture: 'https://images.unsplash.com/photo-1521587765099-8835e7201186?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
                            registerDate: '2018-04-03 04:59:27',
                            avgRating: 2,
                            totalReviews: 20,
                            isCaregiver: false,
                            firstName: 'Rick',
                            lastName: 'Jones',
                            about: 'Praesent egestas hendrerit rhoncus. Vivamus sagittis blandit purus sit amet egestas.',
                            location: {
                                city: 'Ottawa',
                                area: 'ON',
                                postalCode: 'K1P1A4',
                                country: 'CA'
                            },
                        },

                });
            case '40':
                return of({
                    data:
                        {
                            id: 40,
                            profilePicture: 'https://images.unsplash.com/photo-1529074723-3167de44a1da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
                            registerDate: '2018-04-03 04:59:27',
                            avgRating: 4,
                            totalReviews: 20,
                            isCaregiver: false,
                            firstName: 'Steph',
                            lastName: 'Marks',
                            about: 'Praesent egestas hendrerit rhoncus. Vivamus sagittis blandit purus sit amet egestas.',
                            location: {
                                city: 'Ottawa',
                                area: 'ON',
                                postalCode: 'K1P1A4',
                                country: 'CA'
                            },
                        },

                });

            default:
                return of({
                    data:
                        {
                            id: 40,
                            profilePicture: 'https://images.unsplash.com/photo-1529074723-3167de44a1da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
                            registerDate: '2018-04-03 04:59:27',
                            avgRating: 5,
                            totalReviews: 20,
                            isCaregiver: false,
                            firstName: 'Steph',
                            lastName: 'Marks',
                            about: 'Praesent egestas hendrerit rhoncus. Vivamus sagittis blandit purus sit amet egestas.',
                            location: {
                                city: 'Ottawa',
                                area: 'ON',
                                postalCode: 'K1P1A4',
                                country: 'CA'
                            },
                        },

                });
        }
    }

    static getMockThreads() {
        return of({
            data: {
                items: [
                    {
                        id: 1,
                        idFrom: 10,
                        idTo: 20,
                        nameFrom: 'Fadi',
                        nameTo: 'Ange',
                        lastMessage: 'Thank you!',
                        lastUpdatedUTC: '2019-03-12 02:02:58'
                    },
                    {
                        id: 2,
                        idFrom: 30,
                        idTo: 10,
                        nameFrom: 'Rick',
                        nameTo: 'Fadi',
                        lastMessage: 'Sounds good! See you then!',
                        lastUpdatedUTC: '2019-04-04 06:02:58'
                    },
                    {
                        id: 3,
                        idFrom: 40,
                        idTo: 10,
                        nameFrom: 'Steph',
                        nameTo: 'Fadi',
                        lastMessage: 'Yes I will be there at 5 PM',
                        lastUpdatedUTC: '2019-04-11 06:02:58'
                    }
                ]
            }
        });
    }

    static getMockPhotos() {
        return of({
            data: {
                items:     [
                    {url: 'https://cdn.aarp.net/content/dam/aarp/home-and-family/family-and-friends/2017/04/1140-cc2c-connecting-caregivers-to-community.imgcache.rev8d0bdfe86fa1d0d3a7be77b9531a5513.jpg'},
                    {url: 'https://images.unsplash.com/photo-1538678867871-8a43e7487746?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'},
                    {url: 'https://images.unsplash.com/photo-1489451058181-433dc9ffa757?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80'},
                    {url: 'http://pibarre.org/wp-content/uploads/2019/02/hero-Alzheimers-Caregivers-Support.jpg'},
                    {url: 'http://www.swpa-aaa.org/photoheaders/FamCaregiver.jpg'},
                    {url: 'https://www.strathcona.ca/files/images/fcs-medium-caregiverseries-660x396.jpg'},
                ]
            }
        });
    }

    // currently always return the same review data for all users
    static getMockReviews(id: string) {
        return of({
            data: {
                items: [
                    {
                        id: 1,
                        idFrom: 20,
                        from: 'Ange',
                        rating: 4,
                        text: 'Very Compasionate Provider',
                        dateUTC: '2019-04-11 06:02:58',
                    },
                    {
                        id: 2,
                        idFrom: 50,
                        from: 'Jimmy Buffet',
                        rating: 5,
                        text: 'Great service',
                        dateUTC: '2019-02-11 06:02:58',
                    },
                    {
                        id: 3,
                        idFrom: 30,
                        from: 'Rick',
                        rating: 3,
                        text: 'Very demanding Client',
                        dateUTC: '2019-03-26 06:02:58',
                    },
                    {
                        id: 4,
                        idFrom: 60,
                        from: 'Jessica Jones',
                        rating: 1,
                        text: 'Provider did not show up for apointment',
                        dateUTC: '2019-01-01 06:02:58',
                    },
                    {
                        id: 5,
                        idFrom: 40,
                        from: 'Steph',
                        rating: 4,
                        text: 'Thank you for the hard work',
                        dateUTC: '2019-04-02 06:02:58',
                    },
            ]}
        });
    }

    static getMockSelfProfile() {
        return of({data: {
            id: '10',
            email: 'fadi@gmail.com',
            profilePicture: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?size=200',
            registerDate: '2018-04-03 04:59:27',
            avgRating: 3,
            totalReviews: 6,
            isCaregiver: 'NO',
            firstName: 'Fadi',
            lastName: 'Idaf',
            dob: {
                year: '1932',
                month: '11',
                day: '21'
            },
            phone: '6137371111',
            about: 'I have a hard time to walk, I need help around the house',
            location: {
                addressLine1: '123 Round way',
                addressLine2: '',
                city: 'Ottawa',
                area: 'ON',
                postalCode: 'K2K7G3',
                country: 'Canada'
            },
        }});
    }

    static getMockMyShifts() {
        return of({
            data: {
                items: [
                    {
                        id: 1,
                        isServiceProvider: true,
                        startTimeUTC: new Date('2019-04-16 05:00:27'),
                        endTimeUTC: new Date('2019-04-16 08:59:27'),
                        startTimeLocal: new Date('2019-04-16 05:00:27'),
                        endTimeLocal: new Date('2019-04-16 08:59:27'),
                        clientName: "Ange",
                        jobAddress: "16 Woodroffe Road, Nepean, On"
                    },
                    {
                        id: 2,
                        isServiceProvider: true,
                        startTimeUTC: new Date('2019-04-17 02:15:27'),
                        endTimeUTC: new Date('2019-04-17 08:59:27'),
                        startTimeLocal: new Date ('2019-04-17 02:15:27'),
                        endTimeLocal: new Date('2019-04-17 08:59:27'),
                        clientName: "Rick",
                        jobAddress: "10 Rue de la Fabrique, Gatineau, QC"
                    },
                    {
                        id: 3,
                        isServiceProvider: true,
                        startTimeUTC: new Date('2019-04-18 04:30:27'),
                        endTimeUTC: new Date('2019-04-18 08:59:27'),
                        startTimeLocal: new Date('2019-04-18 04:30:27'),
                        endTimeLocal: new Date('2019-04-18 08:59:27'),
                        clientName: "Glenn",
                        jobAddress: "123 Boogie Woogie Avenue, Nepean, On"
                    },

                ]
            }
        });
    }


  static postMockSearch() {
    return of({
      data: {
        items: [
          {
            id: 1,
            title: 'Caregivers needed',
            userOffering: 'Money',
            idUserOffering: 20,
            careType: 'suport worker',
            wage: 15,
            startTimeUTC: '2019-04-17 04:59:27',
            endTimeUTC: '2019-04-17 07:59:27',
            startTimeLocal: '2019-04-17 04:59:27',
            endTimeLocal: '2019-04-17 07:59:27',
            timeZone: 'est',
            description: 'I need help',
            responsibilities: 'give me a bath, cook my meals',
            wardDetails: 'none',
            rules: 'no smoking',
            postalCode: 'k2n2nk',
            km: '3km',
            isContinuous: true,
          },
          {
            id: 2,
            title: 'Caregivers needed',
            userOffering: 'Money',
            idUserOffering: 30,
            careType: 'suport worker',
            wage: 15,
            startTimeUTC: '2019-04-17 04:59:27',
            endTimeUTC: '2019-04-17 07:59:27',
            startTimeLocal: '2019-04-17 04:59:27',
            endTimeLocal: '2019-04-17 07:59:27',
            timeZone: 'est',
            description: 'I need help',
            responsibilities: 'give me a bath, cook my meals',
            wardDetails: 'none',
            rules: 'no smoking',
            postalCode: 'k2n2nk',
            km: '4.3km',
            isContinuous: true,
          },
          {
            id: 3,
            title: 'Caregivers needed',
            userOffering: 'Money',
            idUserOffering: 40,
            careType: 'suport worker',
            wage: 15,
            startTimeUTC: '2019-04-17 04:59:27',
            endTimeUTC: '2019-04-17 07:59:27',
            startTimeLocal: '2019-04-17 04:59:27',
            endTimeLocal: '2019-04-17 07:59:27',
            timeZone: 'est',
            description: 'I need help',
            responsibilities: 'give me a bath, cook my meals',
            wardDetails: 'none',
            rules: 'no smoking',
            postalCode: 'k2n2nk',
            km: '4.8km',
            isContinuous: true,
          },
          {
            id: 4,
            title: 'Caregivers needed',
            userOffering: 'Money',
            idUserOffering: 50,
            careType: 'suport worker',
            wage: 15,
            startTimeUTC: '2019-04-17 04:59:27',
            endTimeUTC: '2019-04-17 07:59:27',
            startTimeLocal: '2019-04-17 04:59:27',
            endTimeLocal: '2019-04-17 07:59:27',
            timeZone: 'est',
            description: 'I need help',
            responsibilities: 'give me a bath, cook my meals',
            wardDetails: 'none',
            rules: 'no smoking',
            postalCode: 'k2n2nk',
            km: '5km',
            isContinuous: true,
          },
        ]
      }
    });
  }


  private static getBookedOffersAsClient() {
    return of({
      data: {
        items: [
          {
            id: '44',
            idServiceProvider: 99,
            serviceProviderName: 'Glen',
            title: 'Meeting with Caregiver Glen',
            careType: 'Massage',
            wage: 10.00,
            total: 60,
            startTimeUTC: new Date('2019-04-17 02:00:00'),
            endTimeUTC: new Date('2019-04-20 09:00:00'),
            startTimeLocal: new Date('2019-04-17 02:00:00'),
            endTimeLocal: new Date('2019-04-20 09:00:00'),
            timeZone: 'est',
            postalCode: 'k2n2nk',
            isContinuous: true,
            allowCancellation: true,
          }
        ]
      }
    });
  }

  private static getWorkOfferHistoryAsClient() {
    return of({
      data: {
        items: [
          {
            id: 33,
            idServiceProvider: 994,
            serviceProviderName: 'Steve',
            title: 'Meeting with Caregiver Steve',
            careType: 'Massage',
            wage: 10.00,
            total: 60,
            startTimeUTC: new Date('2019-04-23 05:00:00'),
            endTimeUTC: new Date('2019-04-29 06:00:00'),
            startTimeLocal: new Date('2019-04-23 05:00:00'),
            endTimeLocal: new Date('2019-04-29 06:00:00'),
            timeZone: 'est',
            postalCode: 'k2n2nk',
            isContinuous: true,
            allowCancellation: true,
          }
        ]
      }
    });
  }
}
