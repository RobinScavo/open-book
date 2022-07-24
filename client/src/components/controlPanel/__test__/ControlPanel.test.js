import ControlPanel from '../ControlPanel';

import { checkProps } from "../../../../tools/utils";

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
})
