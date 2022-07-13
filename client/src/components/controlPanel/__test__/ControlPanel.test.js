import React from "react";
import { shallow } from 'enzyme';
import ControlPanel from '../ControlPanel';


import { mockUser, findByTestAtrr, mockDeck, checkProps } from "../../../../tools/utils";


const setUp = (props={}) => {
    const component = shallow(<ControlPanel {...props} />);
    return component;
}

describe('ControlPanel Component', () => {

    describe('Checking Proptypes', () => {
        test('Should not throw a warning', () => {
            const expectedProps = {
                showHomeButton: true,
                showCreateButton: true,
                showEditButton: true,
                showUploadButton: true,
                showYourDecksButton: true,
                showDeleteButton: true,
                showPublishButton: true,
                handleDelete: jest.fn(),
                handleEdit: jest.fn(),
                handlePublish: jest.fn(),
                handleUpload: jest.fn()
            }
            const propsErr = checkProps(ControlPanel, expectedProps)
            expect(propsErr).toBeUndefined();
        });
    })

    describe('Have correct props: Home page no user', () => {
        let wrapper;

        beforeEach(() => {
            const props = {
                showHomeButton: false,
                showCreateButton: true,
                showEditButton: false,
                showUploadButton: false,
                showYourDecksButton: true,
                showDeleteButton: false,
                showPublishButton: false,
                user: null
            }
            wrapper = setUp(props)
        });

        test('Should render without errors', () => {
            const controlPanel = findByTestAtrr(wrapper,'control-panel');
            expect(controlPanel.length).toBe(1)
        })
        test('Should NOT render a home button', () => {
            const homeButton = findByTestAtrr(wrapper, 'home-button')
            expect(homeButton.length).toBe(0);
        })
        test('Should render a create button', () => {
            const createButton = findByTestAtrr(wrapper, 'create-button')
            expect(createButton.length).toBe(1);
        })
        test('Should NOT render a edit button', () => {
            const editButton = findByTestAtrr(wrapper, 'edit-button')
            expect(editButton.length).toBe(0);
        })
        test('Should NOT render a upload button', () => {
            const uploadButton = findByTestAtrr(wrapper, 'upload-button')
            expect(uploadButton.length).toBe(0);
        })
        test('Should NOT render a your-decks button', () => {
            const yourDecksButton = findByTestAtrr(wrapper, 'your-decks-button')
            expect(yourDecksButton.length).toBe(0);
        })
        test('Should NOT render a delete button', () => {
            const deleteButton = findByTestAtrr(wrapper, 'delete-button')
            expect(deleteButton.length).toBe(0);
        })
        test('Should NOT render a publish button', () => {
            const publishButton = findByTestAtrr(wrapper, 'publish-button')
            expect(publishButton.length).toBe(0);
        })

    })

    describe('Have correct props: Home page with user', () => {
        let wrapper;

        beforeEach(() => {
            const props = {
                showYourDecksButton: true,
                user: mockUser
            }
            wrapper = setUp(props)
        });

        test('Should render a your-decks button', () => {
            const yourDecksButton = findByTestAtrr(wrapper, 'your-decks-button')
            expect(yourDecksButton.length).toBe(1);
        })

    })

    describe('Have correct props: Public deck details with no user', () => {
        let wrapper;

        beforeEach(() => {
            const props = {
                showHomeButton: true,
                showCreateButton: true,
                showEditButton: false,
                showUploadButton: false,
                showYourDecksButton: true,
                showDeleteButton: false,
                showPublishButton: false,
                user: null
            }
            wrapper = setUp(props)
        });

        test('Should render without errors', () => {
            const controlPanel = findByTestAtrr(wrapper,'control-panel');
            expect(controlPanel.length).toBe(1)
        })
        test('Should render a home button', () => {
            const homeButton = findByTestAtrr(wrapper, 'home-button')
            expect(homeButton.length).toBe(1);
        })
        test('Should render a create button', () => {
            const createButton = findByTestAtrr(wrapper, 'create-button')
            expect(createButton.length).toBe(1);
        })
        test('Should NOT render a edit button', () => {
            const editButton = findByTestAtrr(wrapper, 'edit-button')
            expect(editButton.length).toBe(0);
        })
        test('Should NOT render a upload button', () => {
            const uploadButton = findByTestAtrr(wrapper, 'upload-button')
            expect(uploadButton.length).toBe(0);
        })
        test('Should NOT render a your-decks button', () => {
            const yourDecksButton = findByTestAtrr(wrapper, 'your-decks-button')
            expect(yourDecksButton.length).toBe(0);
        })
        test('Should NOT render a delete button', () => {
            const deleteButton = findByTestAtrr(wrapper, 'delete-button')
            expect(deleteButton.length).toBe(0);
        })
        test('Should NOT render a publish button', () => {
            const publishButton = findByTestAtrr(wrapper, 'publish-button')
            expect(publishButton.length).toBe(0);
        })
    })

    describe('Have correct props: Public deck details with user', () => {
        let wrapper;

        beforeEach(() => {
            const props = {
                showHomeButton: true,
                showYourDecksButton: true,
                showUploadButton:true,
                user: mockUser
            }
            wrapper = setUp(props)
        });

        test('Should render a home button', () => {
            const homeButton = findByTestAtrr(wrapper, 'home-button')
            expect(homeButton.length).toBe(1);
        })
        test('Should render a your-decks button', () => {
            const yourDecksButton = findByTestAtrr(wrapper, 'your-decks-button')
            expect(yourDecksButton.length).toBe(1);
        })
        test('Should render a upload button', () => {
            const uploadButton = findByTestAtrr(wrapper, 'upload-button')
            expect(uploadButton.length).toBe(1);
        })

    })

    describe('Have correct props: Private library', () => {
        let wrapper;

        beforeEach(() => {
            const props = {
                showHomeButton: true,
                showCreateButton: true,
                showEditButton: false,
                showUploadButton: false,
                showYourDecksButton: false,
                showDeleteButton: false,
                showPublishButton: false,
                user: mockUser
            }
            wrapper = setUp(props)
        });

        test('Should render without errors', () => {
            const controlPanel = findByTestAtrr(wrapper,'control-panel');
            expect(controlPanel.length).toBe(1)
        })
        test('Should render a home button', () => {
            const homeButton = findByTestAtrr(wrapper, 'home-button')
            expect(homeButton.length).toBe(1);
        })
        test('Should render a create button', () => {
            const createButton = findByTestAtrr(wrapper, 'create-button')
            expect(createButton.length).toBe(1);
        })
        test('Should NOT render a edit button', () => {
            const editButton = findByTestAtrr(wrapper, 'edit-button')
            expect(editButton.length).toBe(0);
        })
        test('Should NOT render a upload button', () => {
            const uploadButton = findByTestAtrr(wrapper, 'upload-button')
            expect(uploadButton.length).toBe(0);
        })
        test('Should NOT render a your-decks button', () => {
            const yourDecksButton = findByTestAtrr(wrapper, 'your-decks-button')
            expect(yourDecksButton.length).toBe(0);
        })
        test('Should NOT render a delete button', () => {
            const deleteButton = findByTestAtrr(wrapper, 'delete-button')
            expect(deleteButton.length).toBe(0);
        })
        test('Should NOT render a publish button', () => {
            const publishButton = findByTestAtrr(wrapper, 'publish-button')
            expect(publishButton.length).toBe(0);
        })
    })

    describe('Have correct props: Private deck details with published deck', () => {
        let wrapper;

        beforeEach(() => {
            const props = {
                showHomeButton: true,
                showCreateButton: true,
                showEditButton: true,
                showUploadButton: false,
                showYourDecksButton: true,
                showDeleteButton: true,
                showPublishButton: true,
                user: mockUser,
                decks: mockDeck
            }
            wrapper = setUp(props)
        });

        test('Should render without errors', () => {
            const controlPanel = findByTestAtrr(wrapper,'control-panel');
            expect(controlPanel.length).toBe(1)
        })
        test('Should render a home button', () => {
            const homeButton = findByTestAtrr(wrapper, 'home-button')
            expect(homeButton.length).toBe(1);
        })
        test('Should render a create button', () => {
            const createButton = findByTestAtrr(wrapper, 'create-button')
            expect(createButton.length).toBe(1);
        })
        test('Should render a edit button', () => {
            const editButton = findByTestAtrr(wrapper, 'edit-button')
            expect(editButton.length).toBe(1);
        })
        test('Should NOT render a upload button', () => {
            const uploadButton = findByTestAtrr(wrapper, 'upload-button')
            expect(uploadButton.length).toBe(0);
        })
        test('Should render a your-decks button', () => {
            const yourDecksButton = findByTestAtrr(wrapper, 'your-decks-button')
            expect(yourDecksButton.length).toBe(1);
        })
        test('Should render a delete button', () => {
            const deleteButton = findByTestAtrr(wrapper, 'delete-button')
            expect(deleteButton.length).toBe(1);
        })
        test('Should NOT render a publish button', () => {
            const publishButton = findByTestAtrr(wrapper, 'publish-button')
            expect(publishButton.length).toBe(0);
        })
    })

    describe('Have correct props: Private deck details with unpublished deck', () => {
        let wrapper;
        const unpublishedDeck = {...mockDeck}
        unpublishedDeck.published = false

        beforeEach(() => {
            const props = {
                showPublishButton: true,
                decks: unpublishedDeck
            }
            wrapper = setUp(props)
        });

        test('Should render a published button', () => {
            const publishButton = findByTestAtrr(wrapper, 'publish-button')
            expect(publishButton.length).toBe(1);
        })

    })
})
