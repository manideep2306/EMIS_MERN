import React from 'react'
import TotalScholarship from './totalscholarship'
import Dashboard from './Dashboard'
import ScholarshipByDistrict from './scholarshipbydistrict'
import ScholarshipBySchool from './scholarshipbyschool'
import NoScholarshipByDistrict from './noscholarshipbydistrict'
import NoScholarshipBySchool from './noscholarshipbyschool'

const Morecharts = () => {
    return (
        <div>
            <Dashboard/>
            <div className='charts'>
                <div className='chart-item'>
                    <TotalScholarship/>
                </div>
                <div className='chart-item'>
                    <ScholarshipByDistrict/>
                </div>
                <div className='chart-item'>
                    <ScholarshipBySchool/>
                </div>
                <div className='chart-item'>
                    <NoScholarshipByDistrict/>
                </div>
                <div className='chart-item'>
                    <NoScholarshipBySchool/>
                </div>
            </div>
        </div>
    )
}

export default Morecharts