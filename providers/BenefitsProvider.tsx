import React, { useState, createContext, useEffect, useMemo } from 'react'
import store from '../storage/Store';
import { Benefit } from '../types';

type BenefitsContextADT = {
    benefits: Array<Benefit>
    setBenefits: (e: Array<Benefit>) => void
}

export const BenefitsContext = React.createContext<BenefitsContextADT>({} as BenefitsContextADT)

export const BenefitsProvider = (props: { children: React.ReactNode }) => {
    const [benefits, setBenefits] = useState(store.getState().benefits);
    
    useMemo(() => {
        store.dispatch({
            type: 'newBenefits',
            payload: benefits.map((e: Benefit, i: number) => {
                e.ranking = i + 1
                return {
                    ...e,
                }
            })
        })
    }, [benefits])

    return (
        <BenefitsContext.Provider value={{ benefits, setBenefits }}>
            {props.children}
        </BenefitsContext.Provider>
    );
};