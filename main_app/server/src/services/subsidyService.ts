import * as subsidyDao from '../dao/subsidyDao';

export const applySubsidyService = async (userId: string, subsidyData: any) => {
    const subsidy = await subsidyDao.createSubsidy({
        ...subsidyData,
        farmerId: userId,
    });
    return subsidy;
};

export const updateSubsidyStatusService = async (id: string, status: string) => {
    const updated = await subsidyDao.updateSubsidyStatus(id, status);
    return updated;
};

export const getFarmerSubsidiesService = async (userId: string) => {
    return await subsidyDao.findSubsidiesByFarmerId(userId);
};

export const getAllSubsidiesService = async () => {
    return await subsidyDao.findAllSubsidies();
};
