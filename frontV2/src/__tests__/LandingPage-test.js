import {cleanup, fireEvent, render} from '@testing-library/react';
import Landing from "../components/Landing";

afterEach(cleanup);

// Fix broken test
it('should render CTA button', function () {
    // const {queryByLabelText, getByLabelText} = render(<Landing />,);
    //
    // expect(queryByLabelText(/rega/i)).toBeTruthy();
}); 