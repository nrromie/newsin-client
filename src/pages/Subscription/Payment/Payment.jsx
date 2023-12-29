import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useLoadUserData from '../../../hooks/useLoadUserData';
import { useParams } from 'react-router-dom';

const Payment = () => {

    const { plansId } = useParams();
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit } = useForm({ mode: 'onChange' });
    const { user } = useContext(AuthContext)
    const [fetchUser] = useLoadUserData()
    const plans = {
        1: { name: 'Starter', price: 0.99, time: "1 minute" },
        2: { name: 'Standard', price: 7, time: "5 days" },
        3: { name: 'Premium', price: 10, time: "10 days" },
    };

    const onSubmit = (data) => {
        const selectedPlan = plans[data.plan];
        axiosPublic.patch(`/subscribe/${user.email}/${selectedPlan.name}`)
            .then(res => {
                console.log('Subscription successful', res);
                fetchUser()
            })
            .catch(error => {
                console.error('Error subscribing user:', error);
            });
    };


    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-semibold mb-4">Choose a Plan</h1>
            <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="plan" className="block text-sm font-medium text-gray-700">
                            Select a Plan:
                        </label>
                        <select
                            {...register('plan', {
                                required: 'Please select a plan',
                            })}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value={plansId}>
                                    {plans[plansId].name} - ${plans[plansId].price.toFixed(2)} for {plans[plansId].time}
                                </option>
                            {Object.keys(plans).map((planId) => (
                                <option key={planId} value={planId}>
                                    {plans[planId].name} - ${plans[planId].price.toFixed(2)} for {plans[planId].time}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-lg font-semibold">
                            <strong>Selected Plan:</strong> {plans[register('plan')?.value]?.name}
                        </p>
                        <p className="text-lg text-green-600">
                            <strong>Price:</strong> ${plans[register('plan')?.value]?.price.toFixed(2)} / month
                        </p>
                    </div>
                    <button
                        type="submit"
                        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Subscribe Now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Payment;